const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-background border-t mt-10">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-foreground">
          &copy; {year} stock-db, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
