import { StarFilled, CheckCircleFilled } from "@ant-design/icons";

interface FeedbackCardProps {
  name: string;
  verified?: boolean;
  content: string;
  rating: number;
}

export default function FeedbackCard({ name, verified, content, rating }: FeedbackCardProps) {
  return (
    <div className="feedback-card">
      <div style={{ marginBottom: 8 }}>
        {[...Array(rating)].map((_, i) => (
          <StarFilled key={i} style={{ color: "#FFC107", fontSize: 24, marginRight: 2 }} />
        ))}
      </div>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
        {name}
        {verified && <CheckCircleFilled style={{ color: "#16c60c", marginLeft: 8, fontSize: 20 }} />}
      </div>
      <div className="feedback-content">
        &quot;{content}&quot;
      </div>
    </div>
  );
}
