import logo from "../assets/images/logo.png";
import onboarding1 from "../assets/images/onboarding/1.png";
import onboarding2 from "../assets/images/onboarding/2.png";
import onboarding3 from "../assets/images/onboarding/3.png";

const onboardingImages = {
  1: onboarding1,
  2: onboarding2,
  3: onboarding3,
};

export const slides = [
  {
    id: 1,
    image: onboardingImages[1],
    logo: logo,
    title: 'Book Rydes in Seconds',
    description: 'Set your pickup, choose a car, and go—it\'s that simple',
    buttonText: 'Get Started',
  },
  {
    id: 2,
    image: onboardingImages[2],
    logo: logo,
    title: 'Track Every Move, Stay in Control',
    description: 'Watch your driver\'s approach and live route in real-time.',
    buttonText: 'Get Started',
  },
  {
    id: 3,
    image: onboardingImages[3],
    logo: logo,
    title: 'Earn Rewards Every Mile',
    description: 'Collect loyalty points, referral bonuses, and unlock ryde discounts easily.',
    buttonText: 'Create an account',
    secondaryButtonText: 'Login',
    termsText: 'By continuing, you agree to Ryde Terms & Conditions and Privacy Policy'
  },
];