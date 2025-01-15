import { login } from '@/apis/auth';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import useAuthStore from '@/store/authStore';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PadLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.login);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }).then(({ user, accessToken }) => {
      setLogin(user, accessToken);
      alert('로그인 완료');
      navigate('/');
    });
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <form className='flex flex-col items-center' onSubmit={handleLogin}>
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
        <Button height='40px' width='100px' radius='sm' className='bg-black'>
          로그인
        </Button>
        <Link to='/signup'>아직 계정이 없으십니까?</Link>
      </form>
    </div>
  );
};

export default PadLoginPage;
