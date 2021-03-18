import { MESSAGE } from '../../constants/constants';

export const root = isSigned => `
<main class="mt-10 d-flex justify-center">
    <div class="d-flex flex-col">
        <div class="d-flex justify-center">
            <img src="src/images/subway_emoji.png" width="200" />
        </div>
        <p class="mt-0 text-center">
        ${isSigned ? '' : MESSAGE.SIGNIN.REQUIRED}
        </p>
    </div>
</main>
`;
