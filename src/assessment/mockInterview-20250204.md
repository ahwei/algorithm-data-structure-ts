# 一、針對 JavaScript 的題目
## 題目 1：實作深拷貝函式 deepClone
需求說明：
請實作一個 deepClone 函式，可以正確複製物件和陣列（包含巢狀結構），但不需要處理循環引用的情形。
挑戰重點：

處理基本類型與複合數據結構（物件、陣列）。
使用遞迴來遍歷巢狀結構。

## 題目 2：實作事件發射器（EventEmitter）
需求說明：
模擬 Node.js 的 EventEmitter，設計一個類或函式，支援以下方法：

on(eventName, callback)：訂閱事件。
off(eventName, callback)：取消訂閱。
emit(eventName, ...args)：觸發事件並傳遞參數。
挑戰重點：
管理事件與監聽器的關係，確保多個監聽器能正確接收事件。

## 題目 3：實作 Promise.all
需求說明：
請實作一個 myPromiseAll 函式，接收一個 Promise 陣列，返回一個新的 Promise，該 Promise 在所有 Promise 完成後 resolve，一旦有任何一個 Promise reject 就立即 reject。
挑戰重點：

理解 Promise 的狀態轉換和同步處理多個 Promise 的邏輯。

## 題目 4：實作函式防抖（debounce）與節流（throttle）
需求說明：
請分別實作兩個高階函式：

debounce(func, delay)：返回一個新的函式，當連續調用時，只有在最後一次調用後等待 delay 毫秒才執行 func。
throttle(func, interval)：返回一個新的函式，限制在 interval 毫秒內 func 只能被調用一次。
挑戰重點：
熟悉 JavaScript 計時器的使用以及函式閉包的應用。

## 題目 5：實作簡單的觀察者模式（Observer Pattern）
需求說明：
設計一個觀察者模式，包含以下方法：

subscribe(callback)：訂閱某個事件。
unsubscribe(callback)：取消訂閱。
notify(data)：當事件發生時通知所有已訂閱的回調函式。
挑戰重點：
管理回調函式的集合，並確保在 notify 時能正確調用所有訂閱者。



# 二、針對 React 的題目
### 題目 1：實作 useLocalStorage 自訂 Hook
需求說明：
請實作一個 useLocalStorage Hook，能夠同步 component state 與 localStorage 中的資料。當 state 更新時，也會更新 localStorage；當組件初始載入時，則從 localStorage 取得資料。
挑戰重點：

結合 useState 與 useEffect。
處理 JSON 轉換及 localStorage 資料讀寫。

## 題目 2：實作可拖拉排序的列表組件
需求說明：
設計一個列表組件，讓使用者可以透過拖拉調整列表項目的順序。
挑戰重點：

可以使用 HTML5 的 Drag and Drop API 或第三方套件（例如 react-dnd）來實現。
處理拖拉過程中的狀態更新及列表重排序邏輯。

## 題目 3：實作搜尋下拉選單組件
需求說明：
實作一個下拉選單，內含搜尋功能：

使用者輸入文字後，可以自動篩選選項列表。
可結合前面提到的 debounce 技術，避免頻繁搜尋。
挑戰重點：
管理搜尋輸入、選項過濾與選項的展示。
處理點選選項後的狀態更新。

## 題目 4：實作使用 Context 與 useReducer 的全局狀態管理
需求說明：
請實作一個簡單的全局狀態管理方案，例如用於管理使用者認證狀態。
挑戰重點：

使用 Context 提供全局狀態。
利用 useReducer 處理狀態轉換，並透過 dispatch 分發 action。
可擴展加入 middleware 或 logger 功能。

## 題目 5：實作自動儲存草稿功能的表單
需求說明：
設計一個表單組件，包含多個輸入欄位，當使用者停止輸入超過 500 毫秒後，自動將表單資料儲存至 localStorage 或模擬 API 儲存。
挑戰重點：

結合 useDebounce 自訂 Hook 來優化儲存動作。
處理輸入狀態、儲存狀態（loading/error）以及恢復儲存草稿的邏輯。
題目 6：實作簡易路由系統
需求說明：
不使用第三方路由庫，嘗試利用 React 的 state 與事件監聽，實作一個簡單的路由機制，根據 URL 的變化切換不同的 Component。
挑戰重點：

解析 window.location 的變化並觸發組件重新渲染。
處理路由之間的切換效果。
題目 7：實作高階組件 (HOC)
需求說明：
請實作一個高階組件，可以包裹其他 Component，並在特定事件（例如：點擊）時顯示提示訊息或進行權限檢查。
挑戰重點：

了解如何透過 HOC 注入額外的 props 或行為到原有 Component 上。
保留原有 Component 的功能與狀態。
