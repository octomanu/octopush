import { Test, TestingModule } from '@nestjs/testing';
import { ConectionService } from './conection.service';

describe('ConectionService', () => {
  let service: ConectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConectionService],
    }).compile();

    service = module.get<ConectionService>(ConectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
