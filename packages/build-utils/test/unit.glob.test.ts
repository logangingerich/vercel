import fs from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';
import { glob, isDirectory } from '../src';

describe('glob()', () => {
  it('should not return entries for empty directories by default', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'build-utils-test'));
    try {
      await Promise.all([
        fs.writeFile(join(dir, 'root.txt'), 'file at the root'),
        fs.mkdirp(join(dir, 'empty-dir')),
        fs
          .mkdirp(join(dir, 'dir-with-file'))
          .then(() =>
            fs.writeFile(join(dir, 'dir-with-file/data.json'), '{"a":"b"}')
          ),
        fs.mkdirp(join(dir, 'another/subdir')),
      ]);
      const files = await glob('**', dir);
      const fileNames = Object.keys(files).sort();
      expect(fileNames).toHaveLength(2);
      expect(fileNames).toEqual(['dir-with-file/data.json', 'root.txt']);
      expect(isDirectory(files['dir-with-file/data.json'].mode)).toEqual(false);
      expect(isDirectory(files['root.txt'].mode)).toEqual(false);
      expect(files['dir-with-file']).toBeUndefined();
      expect(files['another/subdir']).toBeUndefined();
      expect(files['empty-dir']).toBeUndefined();
    } finally {
      await fs.remove(dir);
    }
  });

  it('should return entries for empty directories with `includeDirectories: true`', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'build-utils-test'));
    try {
      await Promise.all([
        fs.writeFile(join(dir, 'root.txt'), 'file at the root'),
        fs.mkdirp(join(dir, 'empty-dir')),
        fs
          .mkdirp(join(dir, 'dir-with-file'))
          .then(() =>
            fs.writeFile(join(dir, 'dir-with-file/data.json'), '{"a":"b"}')
          ),
        fs.mkdirp(join(dir, 'another/subdir')),
      ]);
      const files = await glob('**', { cwd: dir, includeDirectories: true });
      const fileNames = Object.keys(files).sort();
      expect(fileNames).toHaveLength(4);
      expect(fileNames).toEqual([
        'another/subdir',
        'dir-with-file/data.json',
        'empty-dir',
        'root.txt',
      ]);
      expect(isDirectory(files['another/subdir'].mode)).toEqual(true);
      expect(isDirectory(files['empty-dir'].mode)).toEqual(true);
      expect(isDirectory(files['dir-with-file/data.json'].mode)).toEqual(false);
      expect(isDirectory(files['root.txt'].mode)).toEqual(false);
      expect(files['dir-with-file']).toBeUndefined();
    } finally {
      await fs.remove(dir);
    }
  });
});
