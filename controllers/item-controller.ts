import { FastifyReply } from 'fastify';
import { Item, MyFastifyRequest } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { FastifyRequest } from 'fastify';

export let items = [
  {
    id: '1',
    name: 'Item One',
  },
  {
    id: '2',
    name: 'Item Twoo',
  },
  {
    id: '3',
    name: 'Item Three',
  },
];

export const getItems = (_req: FastifyRequest, reply: FastifyReply) => {
  console.log(items);

  reply.send(items);
};

export const getItem = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as MyFastifyRequest;
  const item = items.find((item: Item) => item.id === id);
  console.log(item);

  reply.send(item);
};

export const addItem = (req: FastifyRequest, reply: FastifyReply) => {
  const { name } = req.body as MyFastifyRequest;
  const newItem: Item = {
    id: uuidv4(),
    name,
  };
  items = [...items, newItem];
  reply.code(201).send(newItem);
};

export const updateItem = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as MyFastifyRequest;
  const { name } = req.body as MyFastifyRequest;

  items = items.map((item) => (item.id === id ? { id, name } : item));
  console.log(items);

  const item = items.find((item) => item.id === id);
  reply.send(item);
};

export const deleteItem = (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as MyFastifyRequest;
  items = items.filter((item: Item) => {
    return item.id !== id;
  });
  reply.send({ message: `Item ${id} has been removed!` });
};
