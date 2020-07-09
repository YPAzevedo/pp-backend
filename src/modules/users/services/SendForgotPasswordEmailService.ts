import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private usersTokenRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.usersTokenRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
