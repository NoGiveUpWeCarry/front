## Store 정의

```tsx
// testStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface TestState {
  test1: number;
  test2: number;
  increaseTest1: () => void;
  increaseTest2: () => void;
}

export const useTestStore = create<TestState>()(
  immer((set) => ({
    test1: 0,
    test2: 0,
    increaseTest1: () => set((state) => state.test1 + 1),
    increaseTest2: () => set((state) => state.test2 + 1),
  }))
);
```

- 파일 이름: xxxStore.ts 형식으로 작성
- Store 이름: useXxxStore 형식으로 작성

## 컴포넌트에서 사용시

```tsx
// Test1.tsx
import { useShallow } from 'zustand/shallow';
const Test1 = () => {
  const [test1, increaseTest1] = useTestStore(
    useShallow((state) => [state.test1, state.increaseTest1])
  );

  return (
    <>
      <button onClick={() => setTest1()}>+1</button>
      <div>{test1}</div>
    </>
  );
};
```

```tsx
// Test2.tsx
import { useShallow } from 'zustand/shallow';
export const Test2 = () => {
  const [test2, increaseTest2] = useTestStore(
    useShallow((state) => [state.test2, state.increaseTest2])
  );

  return (
    <>
      <button onClick={() => setTest2()}>+1</button>
      <div>{test2}</div>
    </>
  );
};
```

- useShallow 훅 사용해서 불필요한 리렌더링 방지하기
