export type ConversationParams = {
  navigation: any;
  route: any;
};

export type MessageProps = {
  id: string;
  content: string;
  created_at: number;
  user_id: string;
  images: string[];
};

export type UserProps = {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  icon_url: string;

  created_at: number;
};

export type ConversationProps = {
  id: string;
  name: string;
  created_at: number;
  icon_url: string;
  users: string[];
  admins: string[];
};
