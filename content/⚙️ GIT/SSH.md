---
created: 2025-08-14
---
# SSH Key 생성 방법

#### 0x01. 키 생성
```bash
ssh-keygen -t rsa -b 4096 -C [GitHub 이메일 주소]
```

```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/you/.ssh/id_rsa): 
Enter passphrase for "/Users/you/.ssh/id_rsa" (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/you/.ssh/id_rsa
Your public key has been saved in /Users/you/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:...
The key's randomart image is:
+---[RSA 4096]----+
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
+----[SHA256]-----+

```

#### 0x02. 공개키 복사
```bash
pbcopy < ~/.ssh/id_rsa.pub
```

#### 0x03. Github 계정에 SSH Key 추가
> [Settings] > [SSH and GPG Keys] 에서 복사한 SSH Key 붙여넣기

#### 0x04. 연결 확인
```bash
ssh -T git@github.com
```