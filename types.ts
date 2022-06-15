import { FastifyRequest } from 'fastify';

export interface Item {
  id: string;
  name: string;
}

export interface MyFastifyRequest extends FastifyRequest {
  id: string;
  name: string;
}
