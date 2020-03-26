import { Request, Response, NextFunction } from "express";

const mockPosts = [
    {
        id: "0",
        title: "beatles",
        album: "white album",
        publishedAt: Date.now,
    },
    {
        id: "1",
        title: "bob dylan",
        album: "blonde on blonde",
        publishedAt: Date.now,
    },
    {
        id: "2",
        title: "chuck beryy",
        album: "berry is on top",
        publishedAt: Date.now,
    },
    {
        id: "3",
        title: "bob dylan",
        album: "blood on the tracks",
        publishedAt: Date.now,
    }
];
class PostController {
    public index(req: Request, res: Response, next: NextFunction): Response<any> | void {
        res.status(200).json({mockPosts});
    };
    public show(req: Request, res: Response, next: NextFunction): Response<any> | void {
        const {id} = req.params;
        const post = mockPosts.find((obj) => obj.id === id)
            
        res.status(200).json({post});

    };
}

export default PostController;