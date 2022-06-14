import { FastifyRequest } from 'fastify';
import { FastifyRequestType } from 'fastify/types/type-provider';

export interface Item {
  id: string;
  name: string;
}

export interface MyFastifyRequest extends FastifyRequest {
  id: string;
  name: string;
}
