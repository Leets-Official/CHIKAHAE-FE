// design-tokens.json
// ref, sys 토큰을 사용하고, comp 토큰은 사용하지 않는 경우

import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 현재 파일의 절대 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tokens.json 파일 읽기 (절대 경로 사용)
const tokensPath = path.join(__dirname, './src/tokens/design-tokens.json');
const outputDir = path.join(__dirname, 'src/tokens');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let tokens;
try {
    tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
} catch (e) {
    console.error(`${tokensPath} 파일을 읽거나 파싱하는 데 실패했습니다:`, e);
    process.exit(1);
}

// 토큰 세트 순서
const tokenSets = tokens.$metadata?.tokenSetOrder || [];

for (const set of tokenSets) {
    // 사용하지 않는 세트 필터링
    if (set === 'comp') continue;

    if (tokens[set]) {
        const data = JSON.stringify(tokens[set], null, 2);
        const outputPath = path.join(outputDir, `sd-${set}.json`);
        fs.writeFileSync(outputPath, data);
        console.log(`sd-${set}.json 파일이 생성되었습니다.`);
    }
}

console.log('🎉 토큰 분리 완료!');