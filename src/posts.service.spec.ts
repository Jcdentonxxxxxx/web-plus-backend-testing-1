import { Post, PostsService } from './posts.service';
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const item = { text: 'Some new post' };
    const addedPost = postsService.create(item);
    expect(addedPost.id).toBe('2');
    expect(addedPost.text).toBe(item.text);
    expect(addedPost.date).toBeDefined();
    expect(Number.isNaN(Date.parse(addedPost.date))).toBe(false);
  });

  it('should find a post', () => {
    const preExisting = postsService.find('1');
    expect(preExisting).toBeDefined();
    expect(preExisting?.text).toBe('Some pre-existing post');

    const created = postsService.create({ text: 'Another post' });
    const found = postsService.find(created.id);
    expect(found).toEqual(created);

    expect(postsService.find('999')).toBeUndefined();
  });
});