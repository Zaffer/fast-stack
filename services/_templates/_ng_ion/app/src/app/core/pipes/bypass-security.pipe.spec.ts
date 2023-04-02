import { BypassSecurityPipe } from './bypass-security.pipe';

describe('BypassSecurityPipe', () => {
  it('create an instance', () => {
    const pipe = new BypassSecurityPipe();
    expect(pipe).toBeTruthy();
  });
});
