export type Character = {
  id: string;
  name: string;
  image: string;
  status: string;
  episode: Array<{ id: string; name: string }>;
};
