import { describe, it, expect } from 'vitest'
import { parseDoc } from './parse'

const SAMPLE = `# ADsP 보드 — 스터디 진도 웹앱

## 요약
| | |
|---|---|
| 라이브 | https://example.vercel.app 운영 중 |
| 스택 | React + Supabase |

## 타임라인
### ◆ 첫 배포 (2026-06)
- **문제**: 진도 공유가 카톡에 흩어짐
- **결정**: Supabase 단일 테이블로 시작
- **⊘기각**: 노션 임베드 방식
- 칩: MVP
- 플레인 불릿 한 줄

## 프롬프트 펼침 (첫 화면 지시문)
> 대시보드를 만들어줘
> 다크 톤으로

## 배운 것 한 줄
작게 배포하고 실사용으로 검증한다.
`

describe('parseDoc', () => {
  const doc = parseDoc(SAMPLE)

  it('H1을 제목과 태그라인으로 분리한다', () => {
    expect(doc.title).toBe('ADsP 보드')
    expect(doc.tagline).toBe('스터디 진도 웹앱')
  })

  it('요약 표를 key/value로 파싱하고 빈 헤더·구분선 행은 버린다', () => {
    expect(doc.summary).toEqual([
      { key: '라이브', value: 'https://example.vercel.app 운영 중' },
      { key: '스택', value: 'React + Supabase' },
    ])
  })

  it('타임라인 노드의 제목·시기·필드(라벨/기각/칩/플레인)를 파싱한다', () => {
    expect(doc.nodes).toHaveLength(1)
    const node = doc.nodes[0]
    expect(node.title).toBe('첫 배포')
    expect(node.time).toBe('2026-06')
    expect(node.fields).toEqual([
      { label: '문제', text: '진도 공유가 카톡에 흩어짐' },
      { label: '결정', text: 'Supabase 단일 테이블로 시작' },
      { label: '⊘기각', text: '노션 임베드 방식' },
      { label: '칩', text: 'MVP' },
      { label: '', text: '플레인 불릿 한 줄' },
    ])
  })

  it('프롬프트 블록(라벨+인용 본문)과 배운 것을 파싱한다', () => {
    expect(doc.prompt).toEqual({ label: '첫 화면 지시문', body: '대시보드를 만들어줘\n다크 톤으로' })
    expect(doc.lesson).toBe('작게 배포하고 실사용으로 검증한다.')
  })

  it('타임라인·프롬프트·배운 것이 없는 원고도 안전하게 처리한다', () => {
    const bare = parseDoc('# 제목만 있는 문서')
    expect(bare.title).toBe('제목만 있는 문서')
    expect(bare.nodes).toEqual([])
    expect(bare.prompt).toBeUndefined()
    expect(bare.lesson).toBeUndefined()
  })
})
