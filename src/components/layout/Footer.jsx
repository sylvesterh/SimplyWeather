import PropTypes from "prop-types";
import {
  Flex,
  Segmented,
  Layout,
} from "antd";
import { Light, Dark } from "@/components/icons";

const Footer = ({ isDarkMode, switchMode }) => {
  return (
    <Layout.Footer className="main-footer">
      <div className="footer-content">
        <Flex gap="small" justify="center">
          <Segmented
            onChange={switchMode}
            value={isDarkMode ? "dark" : "light"}
            size="large"
            options={[
              {
                value: "light",
                icon: <Light />,
              },
              {
                value: "dark",
                icon: <Dark />,
              },
            ]}
          />
        </Flex>
      </div>
    </Layout.Footer>
  );
};

Footer.propTypes = {
  switchMode: PropTypes.func,
  isDarkMode: PropTypes.bool,
};

export default Footer;
