import { Row, Col } from "antd";
import { TwitterOutlined, FacebookFilled, InstagramOutlined, GithubOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function Footer() {
    return (
        <div style={{ marginTop: 64 }}>
            <div style={{ marginBottom: -96 }}>
                {/* Newsletter */}
                <Col
                    style={{
                        background: "var(--primary-color, #222)",
                        color: "#fff",
                        borderRadius: 24,
                        margin: "0 auto",
                        maxWidth: 1300,
                        padding: "48px 56px 56px 48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 32,
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <div style={{ fontWeight: 700, fontSize: 40, lineHeight: 1.1, maxWidth: 500 }}>
                        STAY UP TO DATE ABOUT<br />OUR LATEST PRODUCTS
                    </div>
                    <div style={{ flex: 1, maxWidth: 420 }}>
                        <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: "#fff",
                                    borderRadius: 32,
                                    padding: "0 20px",
                                    height: 48,
                                    marginBottom: 8,
                                }}
                            >
                                <span style={{ color: "#888", fontSize: 20, marginRight: 8 }}>✉️</span>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        flex: 1,
                                        fontSize: 16,
                                        background: "transparent",
                                        height: 40,
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    background: "#fff",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: 32,
                                    fontWeight: 600,
                                    fontSize: 18,
                                    height: 48,
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                            >
                                Subscribe to Newsletter
                            </button>
                        </form>
                    </div>
                </Col>
            </div>
            <footer style={{ background: "var(--secondary-color)", paddingTop: 64 }}>
                {/* Footer Main */}
                <div style={{ maxWidth: 1300, margin: "0 auto", padding: "64px 24px 24px 24px" }}>
                    <Row gutter={[32, 32]}>
                        {/* Left */}
                        <Col xs={24} sm={24} md={8} lg={6}>
                            <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 12 }}>Freakeycaps</div>
                            <div style={{ color: "#666", marginBottom: 24, maxWidth: 220 }}>
                                We have Keycaps that suits your style and which you&apos;re proud to own.
                            </div>
                            <div style={{ display: "flex", gap: 12 }}>
                                <a href="#"><TwitterOutlined style={{ fontSize: 24, color: "#222" }} /></a>
                                <a href="#"><FacebookFilled style={{ fontSize: 24, color: "#222" }} /></a>
                                <a href="#"><InstagramOutlined style={{ fontSize: 24, color: "#222" }} /></a>
                                <a href="#"><GithubOutlined style={{ fontSize: 24, color: "#222" }} /></a>
                            </div>
                        </Col>
                        {/* Columns */}
                        <Col xs={12} sm={12} md={4} lg={3}>
                            <FooterCol title="COMPANY" items={['About', 'Features', 'Works', 'Career']} />
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <FooterCol title="HELP" items={['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy']} />
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <FooterCol title="FAQ" items={['Account', 'Manage Deliveries', 'Orders', 'Payments']} />
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4}>
                            <FooterCol title="RESOURCES" items={['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist']} />
                        </Col>
                    </Row>
                </div>
                <div style={{
                    border: 'none',
                    borderTop: '1.5px var(--divider-color)',
                    margin: '0 auto',
                    width: '90%',
                    maxWidth: 1400,
                }}>
                    {/* Payment */}
                    <div style={{ maxWidth: 1300, marginTop: "20px", padding: "0 24px 24px 100px" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <Image className="footer-payment-img" src="/images/visa.png" alt="Visa" width={64} height={32} />
                            <Image className="footer-payment-img" src="/images/mastercard.png" alt="Mastercard" width={64} height={32} />
                            <Image className="footer-payment-img" src="/images/paypal.png" alt="Paypal" width={64} height={32} />
                            <Image className="footer-payment-img" src="/images/applepay.png" alt="Apple Pay" width={64} height={32} />
                            <Image className="footer-payment-img" src="/images/google-pay.png" alt="Google Pay" width={64} height={32} />
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}

// FooterCol component
function FooterCol({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <div style={{ fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>{title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#444", fontSize: 16 }}>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
