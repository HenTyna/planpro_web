import { useState, useCallback } from 'react'
import {
    storeApiRequest,
    executeApiRequest,
    getApiRequestHistory,
    getAllApiRequests,
    getApiRequestById,
    updateApiRequest,
    deleteApiRequest,
    type ApiRequest,
    type ApiResponse
} from '@/service/openApiTool.service'

export const useApiRequests = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createRequest = useCallback(async (data: Omit<ApiRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
        setLoading(true)
        setError(null)
        try {
            const response = await storeApiRequest(data)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to create API request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const executeRequest = useCallback(async (id: number) => {
        setLoading(true)
        setError(null)
        try {
            const response = await executeApiRequest(id)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to execute API request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const getHistory = useCallback(async (id: number) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getApiRequestHistory(id)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to get request history')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const getRequests = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAllApiRequests()
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to get API requests')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const getRequest = useCallback(async (id: number) => {
        setLoading(true)
        setError(null)
        try {
            const response = await getApiRequestById(id)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to get API request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const updateRequest = useCallback(async (id: number, data: Partial<ApiRequest>) => {
        setLoading(true)
        setError(null)
        try {
            const response = await updateApiRequest(id, data)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to update API request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const deleteRequest = useCallback(async (id: number) => {
        setLoading(true)
        setError(null)
        try {
            const response = await deleteApiRequest(id)
            return response
        } catch (err: any) {
            setError(err.message || 'Failed to delete API request')
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        loading,
        error,
        createRequest,
        executeRequest,
        getHistory,
        getRequests,
        getRequest,
        updateRequest,
        deleteRequest,
        clearError
    }
} 