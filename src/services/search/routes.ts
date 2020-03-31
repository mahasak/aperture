import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import { cache } from "../../middleware/cache";

export default [
    {
        path: "/",
        method: "get",
        handler: async (req: Request, res: Response) => {
            res.send("Hello world!");
        }
    },
    {
        path: "/api/v1/search",
        method: "get",
        handler: [
            cache, // Checking cache
            async ({ query }: Request, res: Response) => {
                const result = await getPlacesByName(query.q);
                res.status(200).send(result);
            }
        ]
    }
];