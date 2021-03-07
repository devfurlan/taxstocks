export default interface ICreateCurtomerDTO {
  name: string;
  birth: Date;
  gender: 'M' | 'F';
  cpf: string;
  email: string;
  password: string;
}
