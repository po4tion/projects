// Footer
import React from 'react';

// atoms
import OutBlock from '../atoms/footer/OutBlock';
import FooterLink from '../atoms/footer/FooterLink';
import Github from '../atoms/icons/Github';

function FooterBlock() {
  return (
    <OutBlock>
      <FooterLink href="https://github.com/po4tion/covid19-app" target="_blank">
        <Github />
      </FooterLink>
    </OutBlock>
  );
}

export default FooterBlock;
