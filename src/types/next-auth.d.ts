import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    avatar: string;
    accessToken: string;
  }
}
