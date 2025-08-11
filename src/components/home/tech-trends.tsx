import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

interface TechTrend {
  name: string;
  percentage: number;
  change: string;
}

interface TechTrendsProps {
  trends: TechTrend[];
}

export function TechTrends({ trends }: TechTrendsProps) {
  return (
    <Card className="p-6 bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333333]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            📈 이번 달 인기 기술스택
          </h3>
          <Badge variant="secondary" className="text-xs">
            1월 기준
          </Badge>
        </div>

        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={trend.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-[#a0a0a0] w-6">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {trend.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    <CountUp value={trend.percentage} suffix="%" />
                  </span>
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      trend.change.startsWith("+")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trend.change.startsWith("+") ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{trend.change}</span>
                  </div>
                </div>
              </div>

              {/* 프로그레스 바 */}
              <div className="w-full bg-gray-200 dark:bg-[#333333] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${trend.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-[#333333]">
          <p className="text-xs text-gray-500 dark:text-[#666666] text-center">
            모집글 기준 기술스택 사용률 · 지난달 대비 변화율
          </p>
        </div>
      </div>
    </Card>
  );
}
