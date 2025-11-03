// apps/flickmosaic/src/pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
  status: string;
  uptime: number;
  timestamp: string;
  environment: string;
};

type ErrorResponse = {
  status: string;
  timestamp: string;
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse | ErrorResponse>
) {
  try {
    const healthcheck: HealthResponse = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };

    res.status(200).json(healthcheck);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    res.status(503).json(errorResponse);
  }
}