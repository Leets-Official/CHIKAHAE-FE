import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['./tokens/sd-*.json'], // 분리된 토큰만 사용
  preprocessors: ['tokens-studio'], // Tokens Studio 형식으로 파싱
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // 만들어질 token 이름 형태, 기본값 camel
      buildPath: 'src/styles/', // 생성될 파일 경로
      files: [
        {
          destination: 'tokens.json', // 반환될 토큰 파일 이름
          format: 'json',
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();