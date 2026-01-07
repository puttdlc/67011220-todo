return (
  <div className="min-h-screen bg-slate-50 text-slate-900">

    {/* --- your entire header + main stays unchanged --- */}

    <ConfirmDialog
      open={confirmOpen}
      variant="danger"
      title="Log out?"
      message="You will need to enter your username again."
      confirmText="Yes, log out"
      cancelText="Cancel"
      onCancel={() => setConfirmOpen(false)}
      onConfirm={() => {
        setConfirmOpen(false);
        doLogout();
      }}
    />

  </div>
);
