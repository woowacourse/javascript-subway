import { MESSAGE } from '../../constants/constants';

export const root = `
    <div id="content" class="d-flex flex-col">
        <div class="d-flex justify-center">
            <img src="src/images/subway_emoji.png" width="200" />
        </div>
        <p class="mt-0 text-center">
        ${MESSAGE.SIGNIN.REQUIRED}
        </p>
    </div>
`;
