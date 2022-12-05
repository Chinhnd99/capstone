export class CreateUserEvent {
  constructor(
    public readonly email: string,
    public readonly password?: string,
    public readonly name?: string,
    public readonly age?: number,
  ) {}
}
