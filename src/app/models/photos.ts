export interface Photos{
    photos:[string];
    photoURLS:[string];
    error?:string;
}

export interface ModifyPhotoStatuses{
    showDeleteInterface:boolean;
    highlighted:boolean;
    index:number;
}