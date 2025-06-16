# componentLibrary

## @iconify/react 이슈 
@iconify/react 라이브러리를 사용하여 하단 메뉴를 구성 하였는데 

```
import { Icon } from '@iconify/react';

function App() {
  return (
    <div>
      <Icon icon="mdi:home" />
      <Icon icon="fa-solid:coffee" />
      <Icon icon="tabler:heart" width="24" height="24" />
    </div>
  );
}
```
페이지에 진입할때마다 깜빡임 현상이 발생 하였다. 그리고 하여 다른 방법을 찾아서 기록 한다.</br>
public/icons/mdi-home.svg 위와같은 형태로 svg 파일을 로드하여 사용하는 방법
   ```
    <Image src="/icons/mdi-home-active.svg" alt="Home Icon" width={30} height={30} priority />
   ```
