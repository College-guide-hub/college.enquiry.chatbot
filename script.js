body{
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg,#667eea,#764ba2);
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  margin:0;
}

.chatbox{
  width:360px;
  background:white;
  border-radius:15px;
  box-shadow:0 10px 25px rgba(0,0,0,0.3);
  overflow:hidden;
}

.header{
  background:#5a67d8;
  color:white;
  padding:15px;
  text-align:center;
  font-size:18px;
  font-weight:bold;
}

.welcome{
  padding:15px;
  background:#edf2f7;
  text-align:center;
  font-size:14px;
}

.messages{
  height:250px;
  padding:10px;
  overflow-y:auto;
}

.user{
  text-align:right;
  margin:8px 0;
}

.bot{
  text-align:left;
  margin:8px 0;
}

.user span{
  background:#5a67d8;
  color:white;
  padding:8px 12px;
  border-radius:12px;
  display:inline-block;
}

.bot span{
  background:#e2e8f0;
  padding:8px 12px;
  border-radius:12px;
  display:inline-block;
}

input{
  width:100%;
  padding:12px;
  border:none;
  border-top:1px solid #ddd;
  outline:none;
}
