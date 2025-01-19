import { signup } from '@/apis/auth';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PadSignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickName] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    signup({ email, nickname, password }).then(() => {
      alert('회원가입 완료');
      navigate('/login/pad');
    });
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <form className='flex flex-col items-center' onSubmit={handleSignup}>
        <Input
          type='email'
          placeholder='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type='text'
          placeholder='nickname'
          required
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
        />
        <Button height='40px' width='100px' radius='sm' className='bg-black'>
          회원가입
        </Button>
        <Link to='/login/pad'>뒤로</Link>
      </form>
    </div>
  );
};

export default PadSignupPage;
