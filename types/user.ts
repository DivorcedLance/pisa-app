export type User = {
  id: string;
  code: string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  telephone: string;
  profilePictureLink: string;
  birthDate: string;
  documentNumber: string;
  type: 'student' | 'teacher';
  
};