export interface Document {
    id: number;
    title: string;
    filetype: string;
    owner: string;
    description: string;
    fileDoc: string;
    signed_status: string; // add this line    owner: string;
    user_id: number;
    privacy: string;
    isEditing:boolean;

  }
  