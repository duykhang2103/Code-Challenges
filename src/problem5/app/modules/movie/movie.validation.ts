import z from "zod";

const create = z.object({
  body: z
    .object({
      title: z.string(),
      releaseDate: z.string().optional(),
      description: z.string().optional(),
      genre: z.string().optional(),
      director: z.string().optional(),
      actors: z.array(z.string()).optional(),
    })
    .strict(),
});

const list = z.object({
  query: z.object({
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
});

const getDetail = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const update = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      releaseDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        })
        .optional(),
      genre: z.string().optional(),
      director: z.string().optional(),
    })
    .strict(),
});

const deleteOne = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const movieValidation = {
  create,
  list,
  getDetail,
  update,
  deleteOne,
};
