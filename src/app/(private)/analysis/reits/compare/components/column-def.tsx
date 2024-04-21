"use client";
import { ColumnDef } from "@tanstack/react-table";
import { calculateReitsRating } from "../../components/make-data";
import { ReitsRatingCriteria } from "@/action/stock/stock-action/reits-analysis";
import { valueToPercent, valueToUnit } from "@/lib/format";
import TableColumnHeader from "@/components/Table/table-column-header";
import Link from "next/link";

interface HeaderCellProps {
  title: string;
}

const CELL_WIDTH = "w-[200px]";

const HeaderCell = ({ title }: HeaderCellProps) => {
  return (
    <div>
      <p className={CELL_WIDTH}>{title}</p>
    </div>
  );
};
const CellWrapper = ({ children }: { children?: React.ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

export const reitsRatingCompareColumns: ColumnDef<{
  ratingCriteria: ReitsRatingCriteria[];
  id: number;
  symbol: string;
  score: number;
  maxScore: number;
  createdAt: Date;
  updatedAt: Date;
}>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Symbol"
        className={CELL_WIDTH}
      />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        <Link href={`/analysis/reits?ticker=${row.original.symbol}`}>
          {row.original.symbol}
        </Link>
      </CellWrapper>
    ),
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Score" className={CELL_WIDTH} />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToPercent(row.original.score / row.original.maxScore)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria1",
    header: () => (
      <HeaderCell title="Is Property Yield between 4% and 5%? (1)" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[0].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria2",
    header: () => (
      <HeaderCell title="Has the company shown consistent growth in Revenue, Profit and Dividend? (1)" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[1].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria3",
    header: () => (
      <HeaderCell title="Is Gearing ratio less than 40%? (1 point if < 40%, 0.5 if 40% to 42%, 0.25 if 42% to 45%)" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[2].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria4",
    header: () => (
      <HeaderCell title="Is Cost of debt less than property yield (spread of at least 2%)?" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[3].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria5",
    header: () => (
      <HeaderCell title="Is there consistent growth in Book value per share?" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[4].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria6",
    header: () => (
      <HeaderCell title="Is Dividend yield at least between 4% to 5%?" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[5].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria7",
    header: () => (
      <HeaderCell title="Is Price to Book less than 5 year average?" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[6].score)}
      </CellWrapper>
    ),
  },
  {
    accessorKey: "ratingCriteria8",
    header: () => (
      <HeaderCell title="Is Dividend Gain over 5 years period more than Price Gain?" />
    ),
    cell: ({ row }) => (
      <CellWrapper>
        {valueToUnit(row.original.ratingCriteria[7].score)}
      </CellWrapper>
    ),
  },
];
