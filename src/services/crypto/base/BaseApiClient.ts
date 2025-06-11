import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_CONFIG } from "../config/apiConfig";
import {
  CryptoApiError,
  RateLimitError,
  CoinNotFoundError,
} from "../../../types/apiTypes";

export class BaseApiClient {
  protected readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add timestamp to avoid caching issues
        if (config.params) {
          config.params._t = Date.now();
        } else {
          config.params = { _t: Date.now() };
        }
        return config;
      },
      (error) =>
        Promise.reject(
          error instanceof Error ? error : new Error(String(error))
        )
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = this.handleError(error);
        return Promise.reject(
          apiError instanceof Error ? error : new Error(String(apiError))
        );
      }
    );
  }

  private handleError(error: AxiosError): CryptoApiError {
    const { response, request, config } = error;

    if (response) {
      // Server responded with error status
      switch (response.status) {
        case 429:
          return new RateLimitError();
        case 404:
          return new CoinNotFoundError("Resource not found");
        default:
          return new CryptoApiError(
            `API Error: ${response.statusText}`,
            response.status,
            config?.url
          );
      }
    } else if (request) {
      // Network error
      return new CryptoApiError("Network error occurred");
    } else {
      // Request setup error
      return new CryptoApiError("Request configuration error");
    }
  }

  protected async get<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(endpoint, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(
        endpoint,
        data,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
