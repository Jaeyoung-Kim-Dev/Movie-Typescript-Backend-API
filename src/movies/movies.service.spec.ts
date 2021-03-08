import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(() => {
    // clear Database
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const allMoviesLength = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLength = service.getAll().length;
      expect(afterDeleteLength).toBeLessThan(allMoviesLength);
    });
    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreateLength = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
      expect(service.getOne(1).title).toEqual('Test Movie');
      expect(service.getOne(1).genres).toEqual(['test']);
      expect(service.getOne(1).year).toEqual(2000);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeUpdateLength = service.getAll().length;
      service.update(1, {
        title: 'Updated Movie',
      });
      const afterUpdateLength = service.getAll().length;
      expect(afterUpdateLength).toEqual(beforeUpdateLength);
      expect(service.getOne(1).title).toEqual('Updated Movie');
      expect(service.getOne(1).genres).toEqual(['test']);
      expect(service.getOne(1).year).toEqual(2000);

      service.update(1, {
        year: 2999,
      });
      expect(service.getOne(1).title).toEqual('Updated Movie');
      expect(service.getOne(1).genres).toEqual(['test']);
      expect(service.getOne(1).year).toEqual(2999);

      service.update(1, {
        genres: ['test', 'test2'],
      });
      expect(service.getOne(1).title).toEqual('Updated Movie');
      expect(service.getOne(1).genres).toEqual(['test', 'test2']);
      expect(service.getOne(1).year).toEqual(2999);
    });
    it('should throw 404 error', () => {
      try {
        service.update(999, {
          genres: ['test', 'test2'],
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });
});
