# 會員登入模組

## 功能
1. SignUp
2. SignIn
3. Login
4. Forget Password / Verify
## 架構
1. 畫面分別為主頁面/登入/註冊/忘記密碼/認證碼
2. 使用firebase驗證email、重新設定密碼、資料庫
3. useContext集中管理表單狀態
4. useReducer更新狀態
## DEMO
1. 線上 https://stoic-rosalind-82d01d.netlify.app/
2. 本地 git colone後指令npm install，根目錄新建一個檔案 ".env.development.local" 加入以下參數並將其值改為你的 firebase API 相對應的值

#### .env.development.local 參數
```
REACT_APP_API_KEY = 'your api key'
REACT_APP_AUTHDOMAIN ='your auth domain'
REACT_APP_PROJECTID = 'your project ID'
REACT_APP_STORAGEBUCKET = 'your storage bucket'
REACT_APP_MESSAGINGSENDERID = 'your messaging sender id'
REACT_APP_APPID = 'your app ID'
