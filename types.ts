import { Server,Member,Profile } from "@prisma/client"
import {Server as NetServer, Socket} from "net";
import { NextApiResponse } from "next";
import {Server as SocketIOServer} from "socket.io"
import { Card, List } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & {profile: Profile})[];
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        }
    }
}


export type ListWithCards = List & { cards: Card[] };
export type CardWithList = Card & { list: List };