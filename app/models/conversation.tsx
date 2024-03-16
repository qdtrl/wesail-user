import {serverTimestamp} from 'firebase/firestore';

type ConversationProps = {
  id: string;
  name: string;
  created_at: typeof serverTimestamp;
  icon_url: string;
  users: string[];
  admins: string[];
};

export default ConversationProps;
