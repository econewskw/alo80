import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, Phone, Building2, Calendar, MessageSquare, Loader2, RefreshCw, Inbox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/alo80-logo.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  message: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<ContactSubmission | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchSubmissions();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // Check if it's an RLS policy violation (unauthorized access)
        if (error.code === "PGRST301" || error.message?.includes("policy")) {
          toast({
            title: "غير مصرح",
            description: "ليس لديك صلاحية الوصول إلى هذه الصفحة",
            variant: "destructive"
          });
          navigate("/login");
          return;
        }
        throw error;
      }
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الرسائل. تأكد من أنك مسجل كمدير.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-KW", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleDeleteClick = (submission: ContactSubmission, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubmissionToDelete(submission);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!submissionToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", submissionToDelete.id);

      if (error) throw error;

      setSubmissions(prev => prev.filter(s => s.id !== submissionToDelete.id));
      if (selectedSubmission?.id === submissionToDelete.id) {
        setSelectedSubmission(null);
      }
      
      toast({
        title: "تم الحذف",
        description: "تم حذف الرسالة بنجاح"
      });
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الرسالة",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Alo 80" className="h-8 brightness-0 invert" />
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="ml-2 h-5 w-5" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Inbox className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{submissions.length}</div>
                <div className="text-muted-foreground">إجمالي الرسائل</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Messages Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">رسائل العملاء</h2>
          <Button variant="outline" onClick={fetchSubmissions} disabled={isLoading}>
            <RefreshCw className={`ml-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border/50">
            <Inbox className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد رسائل</h3>
            <p className="text-muted-foreground">لم يتم استلام أي رسائل من العملاء بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`bg-card p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                    selectedSubmission?.id === submission.id
                      ? "border-primary shadow-md"
                      : "border-border/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{submission.full_name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(submission.created_at)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={(e) => handleDeleteClick(submission, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {submission.message}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Message Details */}
            {selectedSubmission ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card p-6 rounded-xl border border-border/50 sticky top-24"
              >
                <h3 className="text-xl font-bold text-foreground mb-6">تفاصيل الرسالة</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">الاسم</div>
                      <div className="font-medium text-foreground">{selectedSubmission.full_name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">البريد الإلكتروني</div>
                      <a href={`mailto:${selectedSubmission.email}`} className="font-medium text-primary hover:underline">
                        {selectedSubmission.email}
                      </a>
                    </div>
                  </div>

                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">الهاتف</div>
                        <a href={`tel:${selectedSubmission.phone}`} className="font-medium text-primary hover:underline" dir="ltr">
                          {selectedSubmission.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedSubmission.company_name && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">الشركة</div>
                        <div className="font-medium text-foreground">{selectedSubmission.company_name}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">التاريخ</div>
                      <div className="font-medium text-foreground">{formatDate(selectedSubmission.created_at)}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground mb-2">الرسالة</div>
                    <p className="text-foreground whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card p-6 rounded-xl border border-border/50 flex items-center justify-center">
                <p className="text-muted-foreground">اختر رسالة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف رسالة {submissionToDelete?.full_name}؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                "حذف"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
