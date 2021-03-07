import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Customer from '../models/Customer';
import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  birth: Date;
  gender: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateCustomerService {
  public async execute({ name, birth, gender, cpf, email, password }: IRequest): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    const checkEmailCustomerExists = await customerRepository.findOne({
      where: { email },
    });

    if (checkEmailCustomerExists) {
      throw new AppError('Email address already used.');
    }

    const checkCPFCustomerExists = await customerRepository.findOne({
      where: { cpf },
    });

    if (checkCPFCustomerExists) {
      throw new AppError('CPF already used.');
    }

    const hashedPassword = await hash(password, 8);

    const customer = customerRepository.create({ name, birth, gender, cpf, email, password: hashedPassword });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
