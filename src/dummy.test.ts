/**
 * このファイルは Jest の動作を確認するためのもので、必ず失敗するように作られている。
 * 他の正規のテストを追加した際にこのファイルはまるごと除去してよい。
 */
import * as fs from 'fs';

function f(v: string): string {
  fs.mkdir;
  return v;
}

describe('test', () => {
  test('', () => {
    expect(1).toBe(2);
  });

  test('', () => {
    expect(f(1)).toBe(2);
  });
});
