import { http } from "@/utils/http"

// Types for API requests
export interface ApiRequestHeader {
    key: string;
    value: string;
}

export interface ApiRequest {
    id?: number;
    name: string;
    description: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers: ApiRequestHeader[];
    body?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse {
    id?: number;
    requestId: number;
    status: 'success' | 'error' | 'pending';
    response?: any;
    error?: string;
    executionTime?: number;
    executedAt: string;
}

const serviceId = {
    OPEN_API_TOOL: '/api/wb/v1/open-api-tool',
    API_REQUESTS: '/api/requests'
}

// Original functions
const getOpenApiTool = async () => {
    return http.get(serviceId.OPEN_API_TOOL)
}

const createOpenApiTool = async (data: any) => {
    return http.post(serviceId.OPEN_API_TOOL, data)
}

// New API request functions
const storeApiRequest = async (data: Omit<ApiRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    return http.post(serviceId.API_REQUESTS, data)
}

const executeApiRequest = async (id: number) => {
    return http.post(`${serviceId.API_REQUESTS}/${id}/execute`)
}

const getApiRequestHistory = async (id: number) => {
    return http.get(`${serviceId.API_REQUESTS}/${id}/history`)
}

const getAllApiRequests = async () => {
    return http.get(serviceId.API_REQUESTS)
}

const getApiRequestById = async (id: number) => {
    return http.get(`${serviceId.API_REQUESTS}/${id}`)
}

const updateApiRequest = async (id: number, data: Partial<ApiRequest>) => {
    return http.put(`${serviceId.API_REQUESTS}/${id}`, data)
}

const deleteApiRequest = async (id: number) => {
    return http.delete(`${serviceId.API_REQUESTS}/${id}`)
}

export {
    getOpenApiTool,
    createOpenApiTool,
    storeApiRequest,
    executeApiRequest,
    getApiRequestHistory,
    getAllApiRequests,
    getApiRequestById,
    updateApiRequest,
    deleteApiRequest
}