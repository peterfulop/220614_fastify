import { HookHandlerDoneFunction, RouteOptions } from 'fastify';
import { RouteShorthandOptionsWithHandler } from 'fastify';
import { FastifyInstance } from 'fastify';
import {
  addItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
} from '../controllers/item-controller';

const ItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

const getItemsOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: ItemSchema,
      },
    },
  },
  handler: getItems,
};

const getItemOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: ItemSchema,
    },
  },
  handler: getItem,
};

const postItemOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: ItemSchema,
    },
  },
  handler: addItem,
};

const updateItemOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: ItemSchema,
    },
  },
  handler: updateItem,
};

const deleteItemOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteItem,
};

export const itemRoutes = (
  fastify: FastifyInstance,
  _options: RouteOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.get('/items', getItemsOpts);
  fastify.get('/items/:id', getItemOpts);
  fastify.post('/items', postItemOpts);
  fastify.patch('/items/:id', updateItemOpts);
  fastify.delete('/items/:id', deleteItemOpts);

  done();
};
