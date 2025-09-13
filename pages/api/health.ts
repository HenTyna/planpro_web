import type { NextApiRequest, NextApiResponse } from "next";

type HealthResponse = {
    status: string;
    timestamp: string;
    uptime: number;
    environment: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<HealthResponse>,
) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
        });
    }

    // Return health status
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
    });
}
